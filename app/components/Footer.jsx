// import Image from "next/image";
// import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { FiPhone } from "react-icons/fi";
// import { MdEmail } from "react-icons/md";


// const Footer = () => {
//     return (
//       <footer className="bg-blue-900 text-white py-8">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-6 gap-2">
//           {/* Logo and Description */}
//           <div className="pr-2">
//             <Image src="/company-logo.webp" alt="logo"  className="my-2 bg-white rounded-sm p-1"/>
//             <p className="text-sm my-4 ">
//             With over 16+ years of expertise, Sixth Star Technology stands as a premier IT solution provider in India.
//             </p>
//             <div className="flex space-x-2 gap-4 justify-center flex-wrap">
//               <Image
//                 src="/footer-1-iso-20000.webp"
//                 alt="High Performer India"
//                 className="h-12"
//               />
//               <Image
//                 src="/footer-2-gdpr.webp"
//                 alt="Easiest Setup"
//                 className="h-12"
//               />
//               <Image
//                 src="/footer-3-rqc.webp"
//                 alt="Small Business High Performer"
//                 className="h-12"
//               />
//                 <Image
//                 src="/footer-4-ukasl.webp"
//                 alt="Small Business High Performer"
//                 className="h-12"
//               />
//                 <Image
//                 src="/footer-5-iso-27001.webp"
//                 alt="Small Business High Performer"
//                 className="h-12"
//               />
//             </div>
//           </div>
  
//           {/* Company Links */}
//           <div className="pl-6">
//             <h3 className="text-base font-semibold mb-4">COMPANY</h3>
//             <ul className="space-y-2 text-sm">
//               <li>About</li>
//               <li>Why Sixthstar</li>
//               <li>Business Models</li>
//               <li>Testimonials</li>
//               <li>Clients</li>
//               <li>Careers</li>
//               <li>Methodology</li>
//               <li>Sitemap</li>
//               <li>Privacy Policy</li>
//               <li>Acceptable Use Policy</li>
//               <li>Insights</li>
//             </ul>
//           </div>
  
//           {/* Servers Links */}
//           <div>
//             <h3 className="text-base font-semibold mb-4">SERVERS</h3>
//             <ul className="space-y-2 text-sm">
//               <li>Dedicated Servers</li>
//               <li>VPS Server</li>
//               <li>Cloud Server</li>
//               <li>Shared Server</li>
//             </ul>
//             <h3 className="text-base font-semibold mt-10 mb-4">SECURITY</h3>
//             <ul className="space-y-2 text-sm">
//               <li>SSL Certificate</li>
//               <li>Spam Filter</li>
//             </ul>
//           </div>
  
//           {/* Hosting Links */}
//           <div>
//             <h3 className="text-base font-semibold mb-4">HOSTING</h3>
//             <ul className="space-y-2 text-sm">
//               <li>Shared Hosting</li>
//               <li>Reseller Hosting</li>
//               <li>Dedicated Hosting</li>
//               <li>Cloud Hosting</li>
//               <li>VPS Hosting</li>
//             </ul>
//             <h3 className="text-base font-semibold my-4">Resources</h3>
//             <ul className="space-y-2 text-sm">
//               <li>Domain</li>
//               <li>Blogs</li>
//               <li>knowledge base</li>
//               <li>Visual hooks</li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-base font-semibold mb-4">Products</h3>
//             <ul className="space-y-2 text-sm">
//             <li>CRM Software</li>
//             <li>Fleet Management Software</li>
//             <li>HMS Software</li>
//             <li>Payroll Software</li>
//             <li>SFTP Server</li>

//             </ul>
//             <h3 className="text-base font-semibold my-4">SERVICES</h3>
//             <ul className="space-y-2 text-sm">
//               <li>Web Development</li>
//               <li>Mobile App Development</li>
//               <li>SEO</li>
//               <li>High Availability</li>
//             </ul>
//           </div>
  
//           {/* Mail Services Links */}
//           <div>
//             <h3 className="text-base font-semibold mb-4">MAIL SERVICES</h3>
//             <ul className="space-y-2 text-sm">
//               <li>Zimbra Mail</li>
//               <li>Carbonio Mail</li>
//               <li>G Suite</li>
//               <li>Office 365</li>
//               <li>CPanel Hosting in Chennai</li>
//               <li>Enterprises Email</li>
//               <li>Mail Server Support</li>
//             </ul>
//             <h3 className="font-semibold mt-4 mb-2 text-lg">Contact</h3>
//       <ul className="space-y-2 text-sm">
//         <li className="flex items-center gap-2">
//           <MdEmail size={18} className="text-gray-300" />
//           <span>sales@sixthstar.in</span>
//         </li>
//         <li className="flex items-center gap-2">
//           <MdEmail size={18} className="text-gray-300" />
//           <span>support@sixthstar.in</span>
//         </li>
//         <li className="flex items-center gap-2 mt-2">
//           <FiPhone size={18} className="text-gray-300" />
//           <span>+91 9962107399</span>
//         </li>
//         <li className="flex items-center gap-2">
//           <FiPhone size={18} className="text-gray-300" />
//           <span>+91 9383996666</span>
//         </li>
//       </ul>
//       <div className="flex  gap-4  text-white mt-4">
//         <a href="#" aria-label="YouTube" className="hover:text-gray-300 p-1 border rounded-full">
//           <FaYoutube size={12} />
//         </a>
//         <a href="#" aria-label="LinkedIn" className="hover:text-gray-300 p-1 border rounded-full">
//           <FaLinkedin size={12} />
//         </a>
//         <a href="#" aria-label="XTwitter" className="hover:text-gray-300 p-1 border rounded-full">
//           <FaXTwitter size={12} />
//         </a>
//         <a href="#" aria-label="Instagram" className="hover:text-gray-300 p-1 border rounded-full">
//           <FaInstagram size={12} />
//         </a>
//         <a href="#" aria-label="Facebook" className="hover:text-gray-300 p-1 border rounded-full">
//           <FaFacebook size={12} />
//         </a>
//       </div>
//           </div>
  
          
//         </div>
  
//         {/* Footer Bottom */}
//         <div className="pb-2 border-b-2 mx-4 border-white pt-1">
         
//           <p className="text-center text-sm mt-2">
//             &copy; Copyright 2024 Sixthstar Pvt Ltd - Best Web Hosting Provider in India.
//           </p>
//         </div>
//       </footer>
//     );
//   };
  
//   export default Footer;
  