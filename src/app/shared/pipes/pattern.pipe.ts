import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'patternValues'
})
export class PatternPipe implements PipeTransform {

    transform(value: any) {
        if (value in patternValues) {
            return patternValues[value];
        }
    }
}

export const patternValues = {
    firstUppercase: '^[A-Z].*',
    lettersAndDigits: '[A-Za-z0-9]*',
    lettersAndDigitsWithSpace: '[A-Za-z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ/-]+( [A-Za-z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ/-]+)*',
    lettersAndDigitsWithSpaceAndDot: '[A-Za-z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ./-]+( [A-Za-z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ./-]+)*',
    lettersWithSpaceAndDot: '[A-Za-z_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ./-]+( [A-Za-z_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ./-]+)*',
    lettersWithSpace: '[A-Za-z_ąćęłńóśźżĄĘŁŃÓŚŹŻ/-]+( [A-Za-z_ąćęłńóśźżĄĘŁŃÓŚŹŻ/-]+)*',
    digits: '[0-9]*',
    digitsWithDots: '[0-9.]*',
    lettersAndDigitsWithSpaceAndHypen: '[A-Za-z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ/-]+( [A-Za-z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ/-]+)*',
    lettersAndDigitsForLocalization: '[A-Za-z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ,./-]+( [A-Za-z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ,./-]+)*',

}