# Harmoic - A music streaming platform

![Preview Image](./preview.png)

Harmonic is a music streaming platform that allows users to create rooms where members can listen to songs together. The host has control over music playback, and members can chat with each other.

![GitHub contributors](https://img.shields.io/github/contributors/Nikeshchaudhary52494/Spotify-clone?style=for-the-badge&color=48bf21) ![GitHub Repo stars](https://img.shields.io/github/stars/Nikeshchaudhary52494/Spotify-clone?style=for-the-badge) ![GitHub issues](https://img.shields.io/github/issues/Nikeshchaudhary52494/Spotify-clone?style=for-the-badge&color=d7af2d) ![GitHub pull requests](https://img.shields.io/github/issues-pr/Nikeshchaudhary52494/Spotify-clone?style=for-the-badge&color=f47373) ![GitHub License](https://img.shields.io/github/license/Nikeshchaudhary52494/Spotify-clone?style=for-the-badge&color=e67234)

## 🔮 Features

-   🎧 Seamless music streaming experience, allowing users to listen to songs from a vast library.
-   🎵 Music room creation, enabling users to listen to songs together.
-   📁 Admin users can upload songs and manage playlists for organizing favorite tracks.
-   🔍 Advanced search functionality enabling users to easily find songs.
-   🔄 Continuous playback ensuring smooth transitions between tracks.
-   📱 Responsive design all users to access the application on any device
-   🔐 Secure authentication and authorization system.

## 🚀 Live Preview

You can view the live preview of the project [here](https://harmonic-music.vercel.app/).

## 💻 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white) ![WebRTC](https://img.shields.io/badge/WebRTC-0101?style=for-the-badge&logo=WebRTC&logoColor=white)  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)  


## ⚙️ **Installation**  

### **1️⃣ Clone the repository:**  

```bash
git clone https://github.com/Nikeshchaudhary52494/Harmonic.git
```

### **2️⃣ Set up environment variables**  

#### **Frontend `.env` (main-app)**
   Create or edit the .env file and add the following line:  
   
    ```bash
        DATABASE_URL
        JWT_SECRET
        CLOUDINARY_API_SECRET
        CLOUDINARY_API_KEY
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        SOCKET_SITE_URL
        NEXT_PUBLIC_ADMIN_EMAIL
    ```
#### **Backend `.env` (websocket-server)**

    ```bash
        NEXT_PUBLIC_SITE_URL
    ```

4. **Install dependencies:**
   Navigate to the root folder run:
    ```bash
     npm install && npx prisma generate && npx prisma db push
    ```
5. **Start the server:**  
    ```bash
    npm run dev
    ```
6. **Access the application:**
   Open a browser and enter the following URL:
    ```bash
    http://localhost:3000/
    ```

## 🌟 Support Us

If you find this helpful or valuable, please consider 🌟 starring the repository. It helps us gain visibility and encourages further development. We appreciate your support!


