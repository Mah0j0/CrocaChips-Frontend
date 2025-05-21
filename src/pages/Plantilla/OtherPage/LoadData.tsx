import ComponentCard from "../../../shared/ui/common/ComponentCard.tsx";
import Alert from "../../../shared/ui/alert/Alert.tsx";

interface LoadDataProps {
    message: string;
}

export function LoadData({ message }: LoadDataProps) {
    return (
        <ComponentCard title="Info Alert">
            <Alert
                variant="info"
                title="Cargando"
                message={`Cargando ${message}...`}
                showLink={false}
            />
        </ComponentCard>
    );
}