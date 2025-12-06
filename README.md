# Krishna Karki - Portfolio

A modern, high-performance portfolio website built with **React**, **TypeScript**, and **Vite**. This project showcases my work as a multidisciplinary developer and designer based in Nepal.

![Portfolio Preview](public/images/cascade-preview-v2.png)

## 🚀 Tech Stack

- **Framework:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email Service:** [EmailJS](https://www.emailjs.com/)

## ✨ Features

- **Custom Cursor:** A smooth, custom-built cursor using `requestAnimationFrame` for high performance.
- **Interactive Hero:** Text scramble and hover effects using GSAP.
- **Scroll Animations:** Elements reveal and animate on scroll.
- **Live Project Previews:** Featured projects display live interactive previews (via iframe) or fallback images.
- **Contact Form:** Fully functional contact form integrated with EmailJS for real-time emails and auto-replies.
- **Responsive Design:** Fully optimized for all device sizes.

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/roycrisses/Krishna-portfolio.git
   cd Krishna-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run Local Server**
   ```bash
   npm run dev
   ```

## 📦 Deployment

GitHub Actions.

- The workflow file is located at `.github/workflows/deploy.yml`.
- Any push to the `main` branch triggers a build and deploy.
- **Note:** Ensure you have added your EmailJS secrets to the GitHub Repository Settings > Secrets and variables > Actions.



