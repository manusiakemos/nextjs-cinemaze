import 'tailwindcss/tailwind.css'

import "@/css/globals.css";

import { motion } from "framer-motion";

import {useRouter} from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <motion.div
      key={router.route}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      <Component {...pageProps} />
    </motion.div>
  );
}

export default MyApp;

