/* eslint-disable no-unreachable */
/* eslint-disable default-case */
export function getLiteralForKind(kind) {
    switch(kind) {
        case "food":
            return "Comida"
            break;
        case "supply":
            return "Suministros"
            break;
        case "medicine":
            return "Medicamentos"
            break;
        case "services":
            return "Servicios"
            break;
        case "gift":
            return "Regalo"
            break;
        case "donation":
            return "Donation"
            break;
        case "other":
            return "Otros"
            break
    }
}