import { Tag } from "../entity/tag.entity";
import { TagDto } from "./tag.dto";

export function mapTagToDto(tag: Tag): TagDto {
    if (!tag) {
        return null;
    }
    return {
        id: tag.id,
        name: tag.name,
    };
}