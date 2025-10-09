import { icons } from "lucide-react";
import { FC } from "react";


type EmptyStateProps = {
    IconComponent : keyof typeof icons,
    message : string
}


const EmptyState : FC<EmptyStateProps> = ({ IconComponent, message}) => {

    const SelectedIcon = icons[IconComponent]

    return (
        <div className="w-full h-full my-30 flex justify-center items-center flex-col">
            <div className="wiggle-animation">
                <SelectedIcon 
                    strokeWidth = {1} 
                    className="w-30 h-30 text-primatry"
                />
            </div>
            <p className="text-sm">
                {message}
            </p>
        </div>
    )
}

export default EmptyState;