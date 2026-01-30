import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-media-control-panel',
  standalone: true,
  imports: [],
  templateUrl: './media-control-panel.html',
  styleUrl: './media-control-panel.css',
})
export class MediaControlPanel {

  // ========== 1. SIGNALS BASE (Fuente de la verdad) ==========
  volumen = signal(50);           // 0-100
  isPlaying = signal(false);      // true = reproduciendo
  currentTime = signal(0);        // segundos
  
  // Para el desafío del Mute: guarda el volumen anterior
  private volumenAnterior = signal(50);
  isMuted = signal(false);

  // ========== 2. COMPUTED (Estado derivado) ==========
  
  // Convierte segundos a formato MM:SS
  displayTime = computed(() => {
    const totalSeconds = this.currentTime();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    
    return `${mm}:${ss}`;
  });

  // Determina qué icono mostrar según el volumen
  volumeIcon = computed(() => {
    const vol = this.volumen();
    
    if (vol === 0) return '🔇';      // mute
    if (vol < 33) return '🔈';       // bajo
    if (vol < 66) return '🔉';       // medio
    return '🔊';                      // alto
  });

  // ========== 3. EFFECT (Efectos secundarios) ==========
  
  /*
   * ¿Por qué usar effect() y no una función normal?
   * 
   * El effect() se ejecuta AUTOMÁTICAMENTE cada vez que cualquier
   * signal que lee internamente cambia. No necesito llamarlo manualmente.
   * 
   * Si usara una función normal, tendría que acordarme de llamarla
   * cada vez que cambio el volumen, lo cual es propenso a errores.
   * 
   * El effect es ideal para sincronizar con cosas EXTERNAS a Angular:
   * - localStorage (como aquí)
   * - APIs del navegador
   * - console.log para debugging
   * - Librerías de terceros
   */
  constructor() {
    effect(() => {
      const vol = this.volumen();
      localStorage.setItem('volumen', String(vol));
      console.log('Volumen guardado en localStorage:', vol);
    });
  }

  // ========== 4. MÉTODOS DE CONTROL ==========
  
  togglePlay() {
    this.isPlaying.set(!this.isPlaying());
  }

  setVolumen(value: number) {
    if (value > 0) {
      this.isMuted.set(false);
    }
    this.volumen.set(value);
  }

  incrementTime() {
    this.currentTime.update(time => time + 1);
  }

  resetTime() {
    this.currentTime.set(0);
  }

  // ========== 5. DESAFÍO: LÓGICA DEL MUTE ==========
  
  toggleMute() {
    if (this.isMuted()) {
      this.volumen.set(this.volumenAnterior());
      this.isMuted.set(false);
    } else {
      this.volumenAnterior.set(this.volumen());
      this.volumen.set(0);
      this.isMuted.set(true);
    }
  }

}