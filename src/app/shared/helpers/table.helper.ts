
export class TableHelper {
    static getSortingDataAccessor(sortDirection: string) {
        return (data, sortHeaderId) => {
            if (!data[sortHeaderId]) {
                return sortDirection === "asc" ? '3' : '1';
            }
            return '2' + data[sortHeaderId].toString().toLocaleLowerCase();
        }
    }
}

