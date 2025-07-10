
import { motion, useScroll } from "framer-motion"
const ProgressBar = () => {
    const { scrollYProgress } = useScroll()
  return (
    <motion.div
    id="scroll-indicator"
    style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 5,
        originX: 0,
        zIndex: 100,
        backgroundColor: "#60A5FA",
    }}
    ></motion.div>
  )
}

export default ProgressBar