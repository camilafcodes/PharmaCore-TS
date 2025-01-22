import { Imanageable } from "../domain/models/Imanager/Imanageable";
import { SaleItem } from "../domain/models/saleItem";
import { SaleItemDto, UpdateItemDto } from "../infrastructure/dto/saleItem.dto";
import { SaleItemRepository } from "../infrastructure/repositories/saleItem.repository";

export class SaleItemController implements Imanageable<SaleItem> {
    private repository: SaleItemRepository;
    constructor() {
        this.repository = new SaleItemRepository();
    }

    async create(body:
        {
            id_sale: number,
            id_medicine: number,
            quantity: number,

        }
    ): Promise<SaleItem | null> {
        try {
            const saleItemdto = new SaleItemDto(body);
            const errores = await saleItemdto.validateDto();
            if (errores.length > 0) {
                console.log("Existe errores en los datos", errores)
                return null;
            }

            const saleItem = new SaleItem(
                {
                    id_sale: body.id_sale,
                    id_medicine: body.id_medicine,
                    quantity: body.quantity
                }
            );

            const result = await this.repository.create(saleItem);
            if (result && result.id_item) {
                console.log(`el item se agregó con exito`)
                return result;
            } else {
                console.log(`el item no pudo ser agregado`)
                return null;
            }

        } catch (error: any) {
            console.log("ha ocurrido un error al agregar el item.", error.message)
            return null
        }

    }

    async read(): Promise<SaleItem[]> {
        const result: SaleItem[] = await this.repository.read()
        if (result.length > 0) {
            console.log("items obtenidos")

        } else {
            console.log("no hay items registrados")
        }
        return result;
    }

    async searchById(id: number): Promise<SaleItem | null> {
        try {
            const result = await this.repository.searchById(id)
            if (result) {
                return result
            } else {
                return null;
            }

        } catch (error: any) {
            console.log("Ha ocurrido un error inesperado", error.message)
            return null;
        }
    }
    async remove(id: number): Promise<boolean> {

        try {
            const result = await this.repository.remove(id)

            if (result === true) {
                console.log(`item eliminado`)
                return true;
            } else {
                console.log(`no se pudo eliminar el item con id ${id}`)
                return false;
            }
        }

        catch (error) {
            console.log(`Ocurrio un error inesperado con el item con ${id}`)
            return false;

        };

    }

    async update(body: {
        id_item: number
        id_sale: number,
        id_medicine: number,
        quantity: number,
    }

    ): Promise<SaleItem | null> {

        try {
            const saleItemDto = new UpdateItemDto(body);
            const errors = await saleItemDto.validateDto();
            if (errors.length > 0) {
                console.log("Existe errores en los datos", errors)
                return null
            }

            const saleItem = new SaleItem({
                id_item: body.id_item,
                id_sale: body.id_sale,
                id_medicine: body.id_medicine,
                quantity: body.quantity
            });
            const result = await this.repository.update(saleItem);
            if (result) {
                console.log(`item actualizado`)
                return result;
            } else {
                console.log(`No se pudo actualizar el item con id ${body.id_item}`)
                return null;
            }
        } catch (error: any) {
            console.log("Ha ocurrido un error inesperado", error.message)
            return null;
        }
    }
}

