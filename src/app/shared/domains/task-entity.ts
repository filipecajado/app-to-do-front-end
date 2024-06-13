export interface TaskEntity {
  id?: number;
  description: string;
  checked: boolean;
}

export interface TaskEntityToFront extends TaskEntity{
  isEditing?: boolean;
}
