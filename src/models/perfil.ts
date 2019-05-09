export  interface Perfil {
  names: string;
  fatherLastName: string;
  motherLastName: string;
  age: symbol;
  email: string;
  alergy: Array<string>
  id: string;
  //NextMedicalAppointment
  nextMADate: string;
  nextMADescription: string;
  nextMANotes: Array<string>;
  status: boolean;
  //MedicalAppoitmentRecords
  medicalARDates: Array<string>;
  medicalDescriptions: Array<string>;
  note: string;
}
