import Marquee from "@/components/ui/marquee";
import Image from "next/image";

const ReviewCard = ({img}: {img: string}) => {
    return (
        <div className="w-[200px] sm:w-[380px] h-[120px] sm:h-[180px] relative overflow-hidden rounded-lg">
            <Image
                src={img}
                alt="Review Image"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
            />
        </div>
    );
};

type Props = {
    images: string[]
}

export function MarqueeComponent({images}:Props){
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {images.map((review, index) => (
                    <ReviewCard key={index} img={review}/>
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {images.map((review,index) => (
                    <ReviewCard key={index} img={review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
    );
}