import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Client } from '../models/client.model';
import { Movement } from '../models/movement.model';
import { Product } from '../models/product.model';
import { Provider } from '../Models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {

  //constructor() { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportProducts(productos: Product[],fileName:string){
    const newProducts=[];
    productos.forEach(prod => {
     newProducts.push(
       {
         Referencia:prod.reference,
         Nombre:prod.name,
         Costo:prod.cost,
         Precio:prod.price,
         Cantidad:prod.quantity,
         Marca:prod.brand.reference,
         Categoria:prod.category.reference,
         Descripcion:prod.description,
       });
    });

    this.exportExcel(newProducts,fileName);
  }

  public exportClients(clientes: Client[], fileName: string){
    const newClients=[];
    clientes.forEach(client => {
      newClients.push({
        Identificacion:client.identification,
        Nombre:client.name,
        Correo:client.email,
        Telefono:client.telephone,
        Direccion:client.street,
      })
    });
    this.exportExcel(newClients,fileName);
  }

  public exportProviders(proveedores: Provider[], fileName: string){
    const newProveedores=[];
    proveedores.forEach(prov => {
      newProveedores.push({
        Identificacion:prov.identification,
        Nombre:prov.name,
        Empresa:prov.company,
        Correo:prov.email,
        Telefono:prov.telephone,
        Direccion:prov.street,
      })
    });
    this.exportExcel(newProveedores,fileName);
  }

  public exportMovements(movimientos:Movement[],fileName: string){
    const newMovements=[];
    movimientos.forEach(move =>{
      newMovements.push({
        Fecha:move.date,
        Producto:move.product.name,
        Tipo:move.type,
        Entrada:move.inputQuantity,
        Salida:move.outputQuantity,
        Cantidad:move.quantity,
        UsuarioId:move.user.identification,
        Descripcion:move.description
      })
    });
    this.exportExcel(newMovements,fileName);
  }

  private exportExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}
