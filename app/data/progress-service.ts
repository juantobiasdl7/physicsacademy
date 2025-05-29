/**
 * Servicio para manejar el progreso de las lecciones
 * Este servicio proporciona funciones para guardar y obtener el progreso de las lecciones
 * Actualmente usa localStorage, pero puede ser ampliado para usar una base de datos en el futuro
 */

/**
 * Obtener la clave de almacenamiento para una lección
 * @param lessonId - ID de la lección
 * @returns La clave para el localStorage
 */
export function getLessonStorageKey(lessonId: number | string): string {
  return `lesson_${lessonId}_section`;
}

/**
 * Guarda el progreso de una lección
 * @param lessonId - ID de la lección
 * @param sectionIndex - Índice de la sección actual
 */
export function saveLessonProgress(lessonId: number | string, sectionIndex: number): void {
  if (typeof window !== "undefined") {
    const storageKey = getLessonStorageKey(lessonId);
    try {
      localStorage.setItem(storageKey, sectionIndex.toString());
      // Para depuración
      console.log(`Guardando progreso: lección ${lessonId}, sección ${sectionIndex}`);
    } catch (error) {
      console.error("Error al guardar el progreso:", error);
    }
  }
}

/**
 * Obtiene el progreso de una lección
 * @param lessonId - ID de la lección
 * @param totalSections - Número total de secciones en la lección
 * @returns El índice de la sección guardada o null si no hay progreso
 */
export function getLessonProgress(lessonId: number | string, totalSections: number): number | null {
  if (typeof window !== "undefined") {
    const storageKey = getLessonStorageKey(lessonId);
    try {
      const savedSection = localStorage.getItem(storageKey);
      
      if (savedSection !== null) {
        const sectionIndex = parseInt(savedSection, 10);
        // Para depuración
        console.log(`Cargando progreso: lección ${lessonId}, sección guardada ${sectionIndex}`);
        
        if (!isNaN(sectionIndex) && sectionIndex >= 0 && sectionIndex < totalSections) {
          return sectionIndex;
        }
      }
    } catch (error) {
      console.error("Error al cargar el progreso:", error);
    }
  }
  return null;
}

/**
 * Verifica si hay progreso guardado para una lección
 * @param lessonId - ID de la lección
 * @returns True si hay progreso guardado, false en caso contrario
 */
export function hasLessonProgress(lessonId: number | string): boolean {
  if (typeof window !== "undefined") {
    const storageKey = getLessonStorageKey(lessonId);
    try {
      const savedSection = localStorage.getItem(storageKey);
      return savedSection !== null && savedSection !== undefined;
    } catch (error) {
      console.error("Error al verificar el progreso:", error);
    }
  }
  return false;
}

/**
 * Limpia el progreso guardado para una lección
 * @param lessonId - ID de la lección
 */
export function clearLessonProgress(lessonId: number | string): void {
  if (typeof window !== "undefined") {
    const storageKey = getLessonStorageKey(lessonId);
    try {
      localStorage.removeItem(storageKey);
      console.log(`Eliminando progreso: lección ${lessonId}`);
    } catch (error) {
      console.error("Error al limpiar el progreso:", error);
    }
  }
} 