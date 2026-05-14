# AttendFlow

AttendFlow is a premium, modern attendance and employee management system designed with a sleek, data-driven interface. It serves as a **high-end reference and demonstration** of how modern web design can achieve a premium, "state-of-the-art" aesthetic while remaining fully functional and data-integrated.

**Live Demo**: [attendflow24.vercel.app](https://attendflow24.vercel.app//)

> **AI-Generated Excellence**: This project was conceived and built with advanced AI assistance to showcase the future of rapid, high-quality software development. It stands as a testament to how AI can bridge the gap between complex business logic and premium user experience design.

> **⚠️ Disclaimer**: This is an **experimental project**. The code and functionality are intended for reference and demonstration purposes. While fully functional, it may contain limitations or unexpected behavior. Use at your own risk.

## Features

- **Dynamic Dashboard**: Real-time attendance breakdown, check-in/out trends, and status summaries.
- **Attendance Management**: Full-featured attendance log with monthly filtering and a calendar-based visual view.
- **Leave System**: Request leaves with balance validation, track history, and view public holidays.
- **Performance Analytics**: Visualized contribution graphs, achievement tracking, and progress metrics.
- **Expense & Travel**: Streamlined forms for submitting and tracking business expenses and travel requests.
- **Multi-role Access**: Tailored experiences for Employees, Managers, and Admins with approval workflows.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop with a premium dark-mode aesthetic.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AshwetHarde/AttendFlow.git
cd AttendFlow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Technology Stack

- **Frontend**: React 19 with Vite 8
- **UI & Styling**: TailwindCSS 4, Lucide Icons, React Icons
- **Charts**: Chart.js with React-Chartjs-2
- **Routing**: React Router 7
- **Data**: Mock API with JSON persistence

## Project Structure

```
AttendFlow/
├── src/
│   ├── components/
│   │   ├── attendance/     # Log, Calendar, and Attendance stats
│   │   ├── auth/           # Login and Route protection
│   │   ├── dashboard/      # Main overview cards and graphs
│   │   ├── leave/          # Leave forms, balances, and history
│   │   ├── performance/    # Achievement and contribution visuals
│   │   └── shared/         # Common UI (Header, Sidebar, Footer)
│   ├── context/
│   │   ├── AppContext.jsx  # Global app state (attendance, leaves)
│   │   └── AuthContext.jsx # User sessions and permissions
│   ├── data/
│   │   └── mockData.json   # Primary data store
│   ├── pages/              # Main route components
│   └── services/           # Mock API handlers
├── public/                 # Static assets (logos, images)
├── vercel.json             # Deployment configuration
├── index.html
├── package.json
└── vite.config.js
```

## Deployment

This project is optimized for Vercel. Simply push to your repository and it will deploy as a Vite Single Page Application (SPA).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Vite](https://vitejs.dev/) for the ultra-fast build tool
- [TailwindCSS](https://tailwindcss.com/) for the modern styling framework
- [Lucide Icons](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/) for the premium iconography
- [Chart.js](https://www.chartjs.org/) for the beautiful data visualizations
- [Vercel](https://vercel.com/) for the seamless hosting and deployment

## Support

For issues and questions, please open an issue on GitHub.