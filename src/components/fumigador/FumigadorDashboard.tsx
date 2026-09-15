import React, { useState, useEffect } from 'react';
import { FumigadorAccount, ClientItem, ServiceRecord } from '../../types';
import { storageService } from '../../services/storageService';
import { FumigadorNavbar } from './FumigadorNavbar';
import { ClientsManager } from './ClientsManager';
import { ServicesManager } from './ServicesManager';
import { CertificateGenerator } from './CertificateGenerator';
import { MetricsDashboard } from './MetricsDashboard';
import { BackupManager } from './BackupManager';
import { SubscriptionManager } from './SubscriptionManager';

interface FumigadorDashboardProps {
  currentAccount: FumigadorAccount;
  onLogout: () => void;
  onSwitchAccount: () => void;
  onViewPublicSite: () => void;
  onAccountUpdated?: (updated: FumigadorAccount) => void;
}

export const FumigadorDashboard: React.FC<FumigadorDashboardProps> = ({
  currentAccount,
  onLogout,
  onSwitchAccount,
  onViewPublicSite,
  onAccountUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'clients' | 'services' | 'certificates' | 'metrics' | 'backup' | 'subscription'>('clients');
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [account, setAccount] = useState<FumigadorAccount>(currentAccount);

  useEffect(() => {
    setAccount(currentAccount);
  }, [currentAccount]);

  // State to pass client/service to certificate or service modals
  const [selectedClientForAction, setSelectedClientForAction] = useState<ClientItem | null>(null);
  const [selectedServiceForCert, setSelectedServiceForCert] = useState<ServiceRecord | null>(null);

  // Load isolated data for this fumigador
  const loadData = () => {
    const fumigadorClients = storageService.getClients(account.id);
    const fumigadorServices = storageService.getServices(account.id);
    setClients(fumigadorClients);
    setServices(fumigadorServices);
  };

  useEffect(() => {
    loadData();
  }, [account.id]);

  const handleSaveClient = (clientData: Omit<ClientItem, 'id' | 'fumigadorId' | 'createdAt'>, existingId?: string) => {
    storageService.saveClient(account.id, clientData, existingId);
    loadData();
  };

  const handleDeleteClient = (clientId: string) => {
    storageService.deleteClient(account.id, clientId);
    loadData();
  };

  const handleSaveService = (serviceData: Omit<ServiceRecord, 'id' | 'fumigadorId'>) => {
    storageService.saveService(account.id, serviceData);
    loadData();
  };

  const handleDeleteService = (serviceId: string) => {
    storageService.deleteService(account.id, serviceId);
    loadData();
  };

  const handleOpenNewService = (client: ClientItem) => {
    setSelectedClientForAction(client);
    setActiveTab('services');
  };

  const handleOpenCertificate = (client: ClientItem) => {
    setSelectedClientForAction(client);
    setSelectedServiceForCert(null);
    setActiveTab('certificates');
  };

  const handleOpenCertificateForService = (service: ServiceRecord) => {
    const client = clients.find(c => c.id === service.clientId) || null;
    setSelectedClientForAction(client);
    setSelectedServiceForCert(service);
    setActiveTab('certificates');
  };

  const handleSubscriptionUpdated = (updated: FumigadorAccount) => {
    setAccount(updated);
    if (onAccountUpdated) {
      onAccountUpdated(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Bar */}
      <FumigadorNavbar
        currentAccount={account}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        clientsCount={clients.length}
        onLogout={onLogout}
        onSwitchAccount={onSwitchAccount}
        onViewPublicSite={onViewPublicSite}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'clients' && (
          <ClientsManager
            fumigador={account}
            clients={clients}
            onSaveClient={handleSaveClient}
            onDeleteClient={handleDeleteClient}
            onOpenNewService={handleOpenNewService}
            onOpenCertificate={handleOpenCertificate}
          />
        )}

        {activeTab === 'services' && (
          <ServicesManager
            fumigador={account}
            clients={clients}
            services={services}
            onSaveService={handleSaveService}
            onDeleteService={handleDeleteService}
            onOpenCertificateForService={handleOpenCertificateForService}
            preSelectedClient={selectedClientForAction}
          />
        )}

        {activeTab === 'certificates' && (
          <CertificateGenerator
            fumigador={account}
            clients={clients}
            services={services}
            initialClient={selectedClientForAction}
            initialService={selectedServiceForCert}
            onSubscriptionUpdated={handleSubscriptionUpdated}
          />
        )}

        {activeTab === 'subscription' && (
          <SubscriptionManager
            fumigador={account}
            onSubscriptionUpdated={handleSubscriptionUpdated}
          />
        )}

        {activeTab === 'metrics' && (
          <MetricsDashboard
            fumigador={account}
            clients={clients}
            services={services}
          />
        )}

        {activeTab === 'backup' && (
          <BackupManager
            fumigador={account}
            clients={clients}
            services={services}
            onDataImported={loadData}
          />
        )}
      </main>
    </div>
  );
};
