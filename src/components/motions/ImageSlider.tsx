import { motion } from 'framer-motion';

type Props = {
  url: string;
  alt: string;
};

const ImageSlider = (props: Props) => {
  return (
    <div className='w-full h-96 rounded-lg'>
      <motion.img
        alt={props.alt}
        src={props.url}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
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
