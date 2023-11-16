"""add menus

Revision ID: 7bbe91b77fbe
Revises: b034f68881a2
Create Date: 2023-11-14 17:16:21.721628

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7bbe91b77fbe'
down_revision: Union[str, None] = 'b034f68881a2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('menu_metas',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('icon', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_menu_metas_icon'), 'menu_metas', ['icon'], unique=False)
    op.create_index(op.f('ix_menu_metas_id'), 'menu_metas', ['id'], unique=False)
    op.create_table('menus',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('path', sa.String(), nullable=False),
    sa.Column('component', sa.String(), nullable=False),
    sa.Column('meta_id', sa.Integer(), nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_menus_component'), 'menus', ['component'], unique=False)
    op.create_index(op.f('ix_menus_id'), 'menus', ['id'], unique=False)
    op.create_index(op.f('ix_menus_meta_id'), 'menus', ['meta_id'], unique=False)
    op.create_index(op.f('ix_menus_name'), 'menus', ['name'], unique=False)
    op.create_index(op.f('ix_menus_path'), 'menus', ['path'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_menus_path'), table_name='menus')
    op.drop_index(op.f('ix_menus_name'), table_name='menus')
    op.drop_index(op.f('ix_menus_meta_id'), table_name='menus')
    op.drop_index(op.f('ix_menus_id'), table_name='menus')
    op.drop_index(op.f('ix_menus_component'), table_name='menus')
    op.drop_table('menus')
    op.drop_index(op.f('ix_menu_metas_id'), table_name='menu_metas')
    op.drop_index(op.f('ix_menu_metas_icon'), table_name='menu_metas')
    op.drop_table('menu_metas')
    # ### end Alembic commands ###