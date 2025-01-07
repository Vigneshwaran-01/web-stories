// "use client";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import Link from "next/link";

// export default function Dropdown({ value, options }) {
//   return (
//     <div className="relative group">
//       <h3
//         className="bg-transparent flex items-center justify-between w-full border-b-2 border-transparent text-lg cursor-pointer text-gray-700 hover:border-blue-500"
//       >
//         {value}
//         <RiArrowDropDownLine size={30} />
//       </h3>

//       <div className="absolute left-0 mt-2 z-20 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 hidden group-hover:block">
//         <ul className="py-2">
//           {options.map((option, index) => (
//             <li key={index}>
//               <Link
//                 href={option.link}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 {option.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
