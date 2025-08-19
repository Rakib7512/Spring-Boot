import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getItem(key: string): string | null {
    return this.isAvailable() ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.isAvailable()) {
      localStorage.setItem(key, value);
    }
  }
}
