# PassHaven - Frontend

Welcome to the frontend repository of PassHaven, a secure and user-friendly password manager app. This application provides features like storing, searching, and autofilling passwords, all designed with a sleek and responsive UI.

---

## Features

- Search and manage stored passwords.
- Autofill forms with saved credentials via the Chrome extension.
- Responsive design with a modern UI styled using **Tailwind CSS**.
- Integrated danger zone for account and password deletion.
- Blue theme with vibrant, poppy buttons for better user experience.

---

## Tech Stack

- **React**: For building the user interface.
- **Vite**: As the build tool for faster development.
- **Tailwind CSS**: For styling the app.
- **Netlify**: For deployment.

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Arvi0204/passhaven-frontend.git
cd passhaven-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory with the following:
```env
VITE_BACKEND=https://pass-haven-backend.vercel.app
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

### 6. Deploy
The frontend can be deployed to **Netlify** or similar platforms. Ensure the environment variables are set correctly.

---

## Deployment

The frontend is currently deployed at:
**[PassHaven Frontend](https://pass-haven.netlify.app)**

---

## Chrome Extension

The frontend includes a route (`/extension`) that guides users on how to load the `.zip` file into their browser and use the extension.

---

## Folder Structure

- **/src**: Contains the React components, pages, and assets.
- **/public**: Static assets like the favicon and manifest.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.