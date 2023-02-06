import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'errorMsgs'
})

export class ErrorMessagesPipe implements PipeTransform {

    transform(value: any) {
        if (value in errorMessages) {
            return errorMessages[value];
        }
    }
}

export const errorMessages = {
    notAllowed: "Only letters and numbers allowed",
    notAllowedCharacter: "<strong>Unacceptable</strong> character",
    emailRequired: 'Email is <strong>required</strong>',
    loginRequired: 'Login is <strong>required</strong >',
    firstNameRequired: 'First name is <strong>required</strong>',
    lastNameRequired: 'Last name is <strong>required</strong>',
    passwordRequired: 'Password is <strong>required</strong>',
    squadronRequired: 'Squadron is <strong>required</strong>',
    squadronNumberRequired: 'Squadron number is <strong>required</strong>',
    repeatPassword: 'Repeat your password',
    rankRequired: 'Rank is <strong>required</strong>',
    nameRequired: 'Name is <strong>required</strong>',
    statusRequired: 'Status is <strong>required</strong>',
    icaoRequired: 'ICAO is <strong>required</strong>',
    localizationRequired: 'Localization is <strong>required</strong>',
    cityRequired: 'City name is <strong>required</strong>',
    tailNumberRequired: 'Tail number is <strong>required</strong>',
    minLength: 'Value is <strong>too short</strong>',
    maxLength: 'Value is <strong>too long</strong>',
    minValue: 'Value is <strong>too low</strong>',
    maxValue: 'Value is <strong>too high</strong>',
    loginEmail: 'Login has to be an <strong>email address</strong>',
    valueRequired: 'Value is <strong>required</strong>',
    onlyDigits: "Only numbers allowed",
    tooEarly: "Land date can not be <strong>before</strong> take off date",
    timeError: "Land time can not be <strong>before</strong> take off time",
    approvedDateRequired: 'Approved date is <strong>required</strong>',
    fcifNumberRequired: 'FCIF number is <strong>required</strong>',
    fcifNumberLength: 'FCIF NUMBER must contain <strong>2-25</strong> characters',
    subjectRequired: 'Subject is <strong>required</strong>',
    contentRequired: 'Content is <strong>required</strong>',
    descriptionRequired: 'Description is <strong>required</strong>',
    fcifTypeRequired: 'FCIF type is <strong>required</strong>',
    passwordMatch: 'Passwords must <strong>match</strong>',
    expiryTimeRequired: 'Expiry Time is <strong>required</strong>',
    expiryTypeRequired: 'Expiry Type is <strong>required</strong>',
    remindingTimeRequired: 'Reminding Time is <strong>required</strong>',
    trainingTaskTypeRequired: 'Task Type is <strong>required</strong>',
    durationRequired: 'Duration is <strong>required</strong>',
    executionDateRequired: 'Execution Date is <strong>required</strong>',
    endBeforeStartDate: 'Start date can not be <strong>before</strong> end date',
    endBeforeStartTime: 'Start time can not be <strong>before</strong> end time',
    remindingTimeMax: 'Reminding time has to be <strong>less</strong> than Expiry time',
}
