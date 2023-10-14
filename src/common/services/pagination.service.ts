import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
    paginateData<T>(data: T[], page: number, limit: number):{ pageData: T[], totalItems: number } {
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / limit);
    
        if (page > totalPages || page < 1) {
          page = 1;
        } 
    
        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, totalItems);
        const pageData = data.slice(startIndex, endIndex);

        return { pageData, totalItems };
      }
}
