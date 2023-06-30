import { motion } from 'framer-motion';

type Props = {
    url: string;
};

const ImageSlider = (props: Props) => {
    return (
        <div className='w-full h-96 rounded-lg'>
            <motion.img
                src={props.url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 5 }}
                transition={{ duration: 1.5 }}
                style={{
                    objectFit: 'cover',
                    objectPosition: '50% 25%',
                    width: '100%',
                    height: '100%',
                    borderRadius: '0.5rem',
                }}
            />
        </div>
    );
};

export default ImageSlider;
