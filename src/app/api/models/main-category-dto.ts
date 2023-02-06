/* tslint:disable */
/* eslint-disable */
import { SubCategoryDto } from './sub-category-dto';
export interface MainCategoryDto {
  id?: number;
  name?: null | string;
  subCategories?: null | Array<SubCategoryDto>;
}
