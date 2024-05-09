import { IsEmpty, IsString, ValidateIf } from "class-validator";

class CreatePostDto {
  @IsString()
  public author: string;

  @IsString()
  public content: string;

  @IsString()
  @ValidateIf((o) => o.value != null)
  public title: string;
}

export default CreatePostDto;
