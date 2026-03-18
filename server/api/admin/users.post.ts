export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string
    password: string
    role?: 'user' | 'moderator' | 'admin'
  }>(event)

  const supabaseAdmin = createSupabaseAdmin()

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
  })

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }

  if (body.role) {
    const { error: roleError } = await supabaseAdmin
      .from('profiles')
      .update({ role: body.role })
      .eq('id', data.user.id)

    if (roleError) {
      throw createError({
        statusCode: 400,
        statusMessage: roleError.message,
      })
    }
  }

  return {
    ok: true,
    userId: data.user.id,
  }
})
