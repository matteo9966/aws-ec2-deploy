import { prisma } from "../lib/prisma";
import { Photo } from "../../prisma/generated/prisma/client";


export const createPhoto = async (data:Photo) => {
      return await prisma.photo.create({
    data,
  });

}