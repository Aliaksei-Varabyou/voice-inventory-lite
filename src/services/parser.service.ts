import { ParsedItem } from "@/types/parsedItem";

export const parserService = {
  parse(text: string): ParsedItem[] {
    if (!text) return [];
    
    return text.split(',').map(part => {
      const [item, quantity] = part.trim().split(' ');
      return {
        item,
        quantity: Number(quantity)
      };
    })
  }
}
