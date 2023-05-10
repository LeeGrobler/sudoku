import { Injectable } from '@angular/core'
import { SupabaseClient, createClient } from '@supabase/supabase-js'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async getDailySudoku() {
    return this.supabase
      .from('sudoku')
      .select('*')
      .eq(
        'play_at',
        // new Date(new Date('2024-05-11').setFullYear(2020))
        new Date(new Date().setFullYear(2020))
          .toLocaleDateString('EN-ZA', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })
          .replace(/\//g, '-'),
      )
      .limit(1)
  }
}
