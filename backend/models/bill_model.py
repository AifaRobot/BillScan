from typing import Optional
from pydantic import BaseModel, Field

class Bill(BaseModel):
    cliente: Optional[str] = Field(default=None, description='Cliente.')
    medidor: Optional[str] = Field(default=None, description='N° de medidor.')
    fecha_vencimiento: Optional[str] = Field(default=None, description='2° Vencimiento.')
    total: Optional[str] = Field(default=None, description='Total.')