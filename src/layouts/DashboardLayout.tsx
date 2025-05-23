import React from 'react';
import Navigation from '@/components/dashboard/Navigation';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <motion.div 
      className="min-h-screen bg-dark-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ParticleBackground variant="minimal" />
      
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-8">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </motion.div>
  );
};