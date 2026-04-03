export const useItemNotesApi = () => {
  const upsertNote = async (itemId: number, note: string) => {
    const supabase = useSupabaseClient()

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase.from('item_notes').upsert({
      item_id: itemId,
      note,
      updated_by: user.id,
    })

    if (error) throw error
  }

  return {
    upsertNote,
  }
}
