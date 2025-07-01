import { View, Text, ScrollView } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Star, Briefcase, Calendar } from "lucide-react-native"
import { globalStyles, colors } from "../../../utils/globalStyles"
import { SearchHeader } from "../../../components/SearchHeader"
import { StatusBadge } from "../../../components/StatusBadge"
import { ActionButtons } from "../../../components/ActionButtons"
import { ContactInfo } from "../../../components/ContactInfo"

export default function DoctorsListScreen() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Juan Pérez",
      specialty: "Cardiología",
      experience: "10 años",
      rating: 4.8,
      appointments: 156,
      status: "available" as const,
      phone: "+57 301 234 5678",
      email: "juan.perez@hospital.com",
      avatar: "https://images.pexels.com/photos/612999/pexels-photo-612999.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 2,
      name: "Dra. María González",
      specialty: "Dermatología",
      experience: "8 años",
      rating: 4.9,
      appointments: 98,
      status: "busy" as const,
      phone: "+57 302 345 6789",
      email: "maria.gonzalez@hospital.com",
      avatar: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      name: "Dr. Carlos López",
      specialty: "Cardiología",
      experience: "12 años",
      rating: 4.7,
      appointments: 203,
      status: "available" as const,
      phone: "+57 303 456 7890",
      email: "carlos.lopez@hospital.com",
      avatar: "https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]

  const DoctorCard = ({ doctor }: { doctor: (typeof doctors)[0] }) => (
    <View style={globalStyles.listCard}>
      <View
        style={[
          globalStyles.avatar,
          { backgroundColor: colors.warning, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Briefcase color={colors.surface} size={24} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <View
          style={[globalStyles.row, { justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }]}
        >
          <Text style={globalStyles.itemTitle}>{doctor.name}</Text>
          <StatusBadge status={doctor.status} />
        </View>

        <Text style={[globalStyles.caption, { color: colors.primary, fontWeight: "600", marginBottom: 8 }]}>
          {doctor.specialty}
        </Text>

        <ContactInfo phone={doctor.phone} email={doctor.email} />

        <View style={[globalStyles.row, { justifyContent: "space-between", marginTop: 8 }]}>
          <View style={globalStyles.row}>
            <Star color="#fbbf24" size={16} fill="#fbbf24" />
            <Text style={[globalStyles.caption, { marginLeft: 4, fontWeight: "600" }]}>{doctor.rating}</Text>
          </View>
          <View style={globalStyles.row}>
            <Briefcase color={colors.text.secondary} size={16} />
            <Text style={[globalStyles.caption, { marginLeft: 4 }]}>{doctor.experience}</Text>
          </View>
          <View style={globalStyles.row}>
            <Calendar color={colors.text.secondary} size={16} />
            <Text style={[globalStyles.caption, { marginLeft: 4 }]}>{doctor.appointments} citas</Text>
          </View>
        </View>
      </View>

      <ActionButtons
        onView={() => router.push(`/(main)/cruds/doctors/${doctor.id}`)}
        onEdit={() => router.push(`/(main)/cruds/doctors/edit/${doctor.id}`)}
      />
    </View>
  )

  return (
    <SafeAreaView style={globalStyles.container}>
      <SearchHeader placeholder="Buscar doctores..." onAdd={() => router.push("/(main)/cruds/doctors/create")} />

      <ScrollView contentContainerStyle={globalStyles.content}>
        <View style={{ gap: 12 }}>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
