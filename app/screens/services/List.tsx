import { View, Text, ScrollView } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Tag, FileText, DollarSign, Activity } from "lucide-react-native"
import { globalStyles, colors } from "@/utils/globalStyles"
import { SearchHeader } from "@/components/SearchHeader"
import { StatusBadge } from "@/components/StatusBadge"
import { ActionButtons } from "@/components/ActionButtons"
import { EmptyState } from "@/components/EmptyState"

export default function ServicesListScreen() {
  const services = [
    {
      id: 1,
      name: "Consulta General",
      description: "Consulta médica general con revisión completa.",
      price: 50000,
      status: "available" as const,
      category: "Consultas",
    },
    {
      id: 2,
      name: "Electrocardiograma",
      description: "Análisis del ritmo cardíaco.",
      price: 75000,
      status: "available" as const,
      category: "Exámenes",
    },
    {
      id: 3,
      name: "Ecocardiograma",
      description: "Examen del corazón por ultrasonido.",
      price: 120000,
      status: "busy" as const,
      category: "Exámenes",
    },
  ]

  const ServiceCard = ({ service }: { service: (typeof services)[0] }) => (
    <View style={globalStyles.listCard}>
      <View
        style={[
          globalStyles.avatar,
          { backgroundColor: colors.primary, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Tag color={colors.surface} size={24} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <View
          style={[globalStyles.row, { justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }]}
        >
          <Text style={globalStyles.itemTitle}>{service.name}</Text>
          <StatusBadge
            status={service.status}
            customText={service.status === "available" ? "Disponible" : "No Disponible"}
          />
        </View>

        <Text style={[globalStyles.caption, { marginBottom: 8 }]}>Categoría: {service.category}</Text>

        <View style={{ gap: 4, marginBottom: 8 }}>
          <View style={[globalStyles.row, { alignItems: "center", gap: 6 }]}>
            <FileText color={colors.text.secondary} size={14} />
            <Text style={[globalStyles.caption, { fontSize: 12, flex: 1 }]} numberOfLines={2}>
              {service.description}
            </Text>
          </View>
          <View style={[globalStyles.row, { alignItems: "center", gap: 6, marginTop: 4 }]}>
            <DollarSign color={colors.primary} size={16} />
            <Text style={[globalStyles.itemTitle, { fontSize: 16, color: colors.primary }]}>
              {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                service.price,
              )}
            </Text>
          </View>
        </View>
      </View>

      <ActionButtons
        onView={() => router.push(`/(main)/cruds/services/${service.id}`)}
        onEdit={() => router.push(`/(main)/cruds/services/edit/${service.id}`)}
      />
    </View>
  )

  return (
    <SafeAreaView style={globalStyles.container}>
      <SearchHeader placeholder="Buscar servicios..." onAdd={() => router.push("/(main)/cruds/services/create")} />

      <ScrollView
        contentContainerStyle={[globalStyles.content, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        {services.length > 0 ? (
          <View style={{ gap: 12 }}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </View>
        ) : (
          <EmptyState
            icon={Activity}
            title="No hay servicios registrados"
            subtitle="Comienza agregando tu primer servicio al sistema"
            buttonText="Agregar Servicio"
            onButtonPress={() => router.push("/(main)/cruds/services/create")}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
