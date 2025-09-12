import { supabase } from '../lib/supabaseClient'

// Check if user exists by email
export async function checkUserExists(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle()

  if (error) {
    console.error('Error checking user:', error)
    return null
  }

  return data // null if no user found
}

// Create new user
export async function createUser(user) {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select()
    .single()

  if (error) {
    console.error('Error creating user:', error)
    return null
  }

  return data
}
