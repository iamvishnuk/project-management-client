import { ThreeCircles } from "react-loader-spinner";

export default function ThreeCirclesLoader() {
    return (
        <div className="h-full flex justify-center items-center">
            <ThreeCircles
                height="100"
                width="100"
                color="#89CFF0"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    );
}
