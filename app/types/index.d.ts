// Tipos globales
declare global {
    // Usuario
    interface User {
      id: string;
      name: string;
      email: string;
      role: string;
      avatar: string;
      token?: string;
    }
  
    // Cita médica
    interface Appointment {
      id: string;
      patientId: string;
      doctorId: string;
      specialtyId: string;
      date: string; // ISO string
      time: string; // HH:mm
      status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
      notes?: string;
    }
  
    // Paciente
    interface Patient {
      id: string;
      name: string;
      document: string;
      phone: string;
      address: string;
      birthDate: string;
      medicalHistory?: string;
    }
  
    // Médico
    interface Doctor {
      id: string;
      name: string;
      specialtyId: string;
      phone: string;
      email: string;
      schedule: DoctorSchedule[];
    }
  
    // Especialidad médica
    interface Specialty {
      id: string;
      name: string;
      description: string;
    }
  
    // Horario médico
    interface DoctorSchedule {
      day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
      startTime: string; // HH:mm
      endTime: string; // HH:mm
    }
  
    // Servicio médico
    interface MedicalService {
      id: string;
      name: string;
      description: string;
      duration: number; // minutos
      cost: number;
    }
  }