import ApplicationsList from '../components/applications/ApplicationsList';

const Applications = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-zinc-950 px-4 sm:px-6 py-8 sm:py-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <ApplicationsList />
      </div>
    </div>
  );
};

export default Applications;