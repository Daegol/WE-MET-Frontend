export default class FilterHelper {

    static checkRowIncludes(filterValue: string, filteredValue: string): boolean {
        return filteredValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
    }

    static checkRowExists(filterArray: string[], filteredValue: string): boolean {
        return filterArray?.length ? this.checkFilteredValueExists(filterArray, filteredValue) : true;
    }

    static checkFilteredValueExists(filterArray: string[], filteredValue: string) {
        for (const d of filterArray) {
            if (filteredValue?.toString().indexOf(d) !== -1) {
                return true;
            }
        }
        return false;
    }

    static checkFilteredValueIsExact(filterArray: string[], filteredValue: string): boolean {
        return filterArray?.length ? this.checkIsExact(filterArray, filteredValue) : true;
    }

    static checkIsExact(filterArray: string[], filteredValue: string) {
        if (filterArray?.length == 0) {
            return true;
        }
        for (const d of filterArray) {
            if (filteredValue === d) {
                return true;
            }
        }
        return false;
    }

}