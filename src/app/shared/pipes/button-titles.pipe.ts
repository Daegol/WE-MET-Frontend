import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'buttonTitles'
})

export class ButtonTitlesPipe implements PipeTransform {

    transform(value: any) {
        if (value in buttonTitles) {
            return buttonTitles[value];
        }
    }
}

export const buttonTitles = {
    //commitment board
    addTitleCommitment: 'Add new Commitment',
    saveTitleCommitment: 'Save Commitment',
    deleteTitleCommitment: 'Delete chosen Commitment(s)',

    //dictionaries
    addTitleAbsenceType: 'Add new Absence Type',
    deleteTitleAbsenceType: 'Delete chosen Absence Type(s)',
    saveTitleAbsenceType: 'Save Absence Type',
    addTitlePurchaseStatus: 'Add new Purchase Status',
    deleteTitlePurchaseStatus: 'Delete chosen Purchase Status',
    saveTitlePurchaseStatus: 'Save Purchase Status',
    addTitlePurchaseType: 'Add new Purchase Type',
    deleteTitlePurchaseType: 'Delete chosen Purchase Type(s)',
    saveTitlePurchaseType: 'Save Purchase Type',
    addTitleCity: 'Add new City',
    addTitleAluminum: 'Aluminium. Dodaj nową pozycję',
    deleteTitleCity: 'Delete chosen City(-ies)',
    saveTitleCity: 'Save City',
    addTitleCrewPosition: 'Add new Crew Position',
    deleteTitleCrewPosition: 'Delete chosen Crew Position(s)',
    saveTitleCrewPosition: 'Save Crew Position',
    addTitleFcifType: 'Add new Fcif Type',
    deleteTitleFcifType: 'Delete chosen FcifType(s)',
    saveTitleFcifType: 'Save Fcif Type',
    addTitleFlightFunction: 'Add new Flight Function',
    deleteTitleFlightFunction: 'Delete chosen Flight Function(s)',
    saveTitleFlightFunction: 'Save Flight Function',
    addTitleFlightType: 'Add new Flight Type',
    deleteTitleFlightType: 'Delete chosen Flight Type(s)',
    saveTitleFlightType: 'Save Flight Type',
    addTitleRank: 'Add new Rank',
    deleteTitleRank: 'Delete chosen Rank(s)',
    saveTitleRank: 'Save Rank',
    addTitleTrainingTaskType: 'Add new Training Task Type',
    deleteTitleTrainingTaskType: 'Delete chosen Training Task Type(s)',
    saveTitleTrainingTaskType: 'Save Training Task Type',
    saveAluminum: 'Zapisz element',

    //maintenance
    addTitlePurchase: 'Add new Purchase',
    deleteTitlePurchase: 'Delete chosen Purchase(s)',
    saveTitlePurchase: 'Save Purchase',

    //administration
    addTitleLocalization: 'Add new Localization',
    deleteTitleLocalization: 'Delete chosen Localization(s)',
    saveTitleLocalization: 'Save Localization',
    addTitlePersonnel: 'Add new Personnel',
    deleteTitlePersonnel: 'Delete chosen Personnel',
    saveTitlePersonnel: 'Save Personnel',
    addTitleSquadron: 'Add new Squadron',
    deleteTitleSquadron: 'Delete chosen Squadron(s)',
    saveTitleSquadron: 'Save Squadron',

    //ops
    addTitleFcif: 'Add new Fcif',
    saveTitleFcif: 'Save Fcif',

    //scheduling
    addTitleFlight: 'Add new Flight',
    deleteTitleFlight: 'Delete chosen Flight(s)',
    saveTitleFlight: 'Save Flight',
    addTitleFlyingSchedule: 'Add new Flying Schedule',
    deleteTitleFlyingSchedule: 'Delete chosen Flying Schedule(s)',
    saveTitleFlyingSchedule: 'Save Flying Schedule',

    //training
    addTitleGroup: 'Add new Group',
    deleteTitleGroup: 'Delete chosen Group(s)',
    saveTitleGroup: 'Save Group',
    addTitleTrainingTask: 'Add new Training Task',
    saveTitleTrainingTask: 'Save Training Task',

    //lookup
    closeTitleLookup: 'Close Lookup',

    //selection
    cancelTitleSelection: 'Unselect all'
}
