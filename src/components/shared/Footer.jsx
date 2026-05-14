const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-4 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-zinc-400">
        <p>&copy; {currentYear} AttendPro. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-zinc-200 transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-200 transition-colors">Terms</a>
          <a href="#" className="hover:text-zinc-200 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
