import { trustSignals } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

export function TrustRow() {
    return (
        <div className="oi-trust">
            {trustSignals.map((signal) => (
                <div className="oi-trust__item" key={signal.title}>
                    <span className="oi-trust__icon">
                        <Icon name={signal.icon} size={20} />
                    </span>
                    <span className="oi-trust__text">
                        <strong className="oi-trust__title">{signal.title}</strong>
                        <small className="oi-trust__caption">{signal.caption}</small>
                    </span>
                </div>
            ))}
        </div>
    );
}
