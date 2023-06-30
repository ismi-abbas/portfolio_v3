import { motion } from 'framer-motion';

type Props = {
    children: React.ReactNode;
    className?: string;
};

export function Box({ children, className }: Props) {
    return (
        <motion.div whileHover={{ scale: 1.2 }} className={className}>
            {children}
        </motion.div>
    );
}

export function BlogPostBox({ children, className }: Props) {
    return (
        <motion.div whileHover={{ scale: 1.03 }} className={className}>
            {children}
        </motion.div>
    );
}
