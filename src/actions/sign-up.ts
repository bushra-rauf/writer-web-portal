'use server'

import { signupSchema } from './schemas'
import { createClient } from '@/utils/supabase/server-client'
import { redirect } from 'next/navigation'
import z from 'zod'

export const signupAction = async (userdata: z.infer<typeof signupSchema>) => {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.signUp(userdata)
    
    if (user && user.email && userdata.userType === 'writer') {
    await supabase.from('writers').insert([{
      id: user.id,
      email: user.email,
      full_name: userdata.fullName,
      bio: null,
    }])
  }

  if (error) throw error

  redirect('/')
}
