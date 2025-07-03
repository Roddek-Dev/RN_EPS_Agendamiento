import type React from "react"
import { View, TextInput, TouchableOpacity } from "react-native"
import { Search, Plus } from "lucide-react-native"
import { globalStyles, colors } from "../utils/globalStyles"

interface SearchHeaderProps {
  placeholder?: string
  onAdd?: () => void
  showAddButton?: boolean
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  placeholder = "Buscar...",
  onAdd,
  showAddButton = true,
}) => (
  <View style={globalStyles.header}>
    <View style={globalStyles.searchContainer}>
      <Search color={colors.text.secondary} size={20} style={globalStyles.searchIcon} />
      <TextInput style={globalStyles.searchInput} placeholder={placeholder} placeholderTextColor={colors.text.muted} />
    </View>
    {showAddButton && onAdd && (
      <TouchableOpacity style={[globalStyles.iconButton, { backgroundColor: colors.primary }]} onPress={onAdd}>
        <Plus color={colors.surface} size={24} />
      </TouchableOpacity>
    )}
  </View>
)
