import { Component, OnInit } from '@angular/core';
import { Pkg } from '../pkg.model';
import { PkgService } from '../pkg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pkg-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pkg-list.component.html',
  styleUrls: ['./pkg-list.component.css']
})
export class PkgListComponent implements OnInit {
  pkgs: Pkg[] = [];
  filteredPkgs: Pkg[] = [];
  searchTerm = '';
  selectedPkg: Pkg | null = null;
  dependencies: { [pkgId: string]: string[] } = {};
  loadingDeps: Set<string> = new Set();

  constructor(private pkgService: PkgService) {}

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages() {
    this.pkgService.getAll().subscribe({
      next: (data: Pkg[]) => {
        this.pkgs = data;
        this.filteredPkgs = [...this.pkgs];
      },
      error: () => {
        this.pkgs = [];
        this.filteredPkgs = [];
      }
    });
  }

  filterPackages() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPkgs = this.pkgs.filter(pkg =>
      pkg.id.toLowerCase().includes(term)
    );
  }

  refreshPackages() {
    this.loadPackages();
    this.searchTerm = '';
    this.selectedPkg = null;
  }

  selectPkg(pkg: Pkg) {
    if (this.selectedPkg?.id === pkg.id) {
      this.selectedPkg = null;
    } else {
      this.selectedPkg = pkg;
      if (!this.dependencies[pkg.id] && !this.loadingDeps.has(pkg.id)) {
        this.loadingDeps.add(pkg.id);
        this.pkgService.getDependencies(encodeURIComponent(pkg.id)).subscribe({
          next: (deps) => {
            this.dependencies[pkg.id] = deps || [];
            this.loadingDeps.delete(pkg.id);
          },
          error: () => {
            this.dependencies[pkg.id] = [];
            this.loadingDeps.delete(pkg.id);
          }
        });
      }
    }
  }

  isDependency(pkg: Pkg): boolean {
    if (!this.selectedPkg) return false;
    const deps = this.dependencies[this.selectedPkg.id] || [];
    return deps.includes(pkg.id);
  }

  formatNumber(value: number): string {
    if (value >= 1_000_000) return Math.floor(value / 1_000_000) + 'M';
    if (value >= 1_000) return Math.floor(value / 1_000) + 'K';
    return value.toString();
  }

  splitPackageName(name: string): { prefix: string; suffix: string } {
    const parts = name.split('/');
    return parts.length > 1
      ? { prefix: parts[0], suffix: parts.slice(1).join('/') }
      : { prefix: name, suffix: '' };
  }
}
