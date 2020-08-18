exports.up = function(knex) {
  //schema guru
  return knex.schema
    .createTable('guru.kategori_kelas', function(table){
        table.increments('id_kategori_kelas')
        table.string('kategori_kelas')
    })
    .createTable('guru.kelas', function(table){
        table.increments('id_kelas')
        table.integer('kategori_kelas_id').unsigned()
        table.string('kelas')
        table.foreign('kategori_kelas_id').references('id_kategori_kelas').inTable('guru.kategori_kelas').onUpdate('cascade').onDelete('cascade')
    })
    .createTable('guru.mata_pelajaran', function(table){
        table.increments('id_mata_pelajaran')
        table.integer('kategori_kelas_id').unsigned()
        table.integer('kelas_id').unsigned()
        table.string('mata_pelajaran')
        table.foreign('kategori_kelas_id').references('id_kategori_kelas').inTable('guru.kategori_kelas').onUpdate('cascade').onDelete('cascade')
        table.foreign('kelas_id').references('id_kelas').inTable('guru.kelas').onUpdate('cascade').onDelete('cascade')
    })
    .createTable('guru.jenis_harga', function(table){
        table.increments('id_jenis_harga')
        table.string('jenis_harga')
    })
    .createTable('guru.guru', function(table){
        table.increments('kd_guru')
        table.integer('user_id').unsigned()
        table.integer('education_id').unsigned()
        table.integer('kategori_kelas_id').unsigned()
        table.integer('kelas_id').unsigned()
        table.integer('mata_pelajaran_id').unsigned()
        table.integer('jenis_harga_id').unsigned()
        table.integer('pekerjaan_id').unsigned()
        table.bigint('harga')
        table.string('jadwal', 100)
        table.string('keahlian', 100)
        table.foreign('user_id').references('id_user').inTable('pengguna.users').onUpdate('cascade').onDelete('cascade')
        table.foreign('education_id').references('id_education').inTable('support.educations').onUpdate('cascade').onDelete('cascade')
        table.foreign('kategori_kelas_id').references('id_kategori_kelas').inTable('guru.kategori_kelas').onUpdate('cascade').onDelete('cascade')
        table.foreign('kelas_id').references('id_kelas').inTable('guru.kelas').onUpdate('cascade').onDelete('cascade')
        table.foreign('mata_pelajaran_id').references('id_mata_pelajaran').inTable('guru.mata_pelajaran').onUpdate('cascade').onDelete('cascade')
        table.foreign('jenis_harga_id').references('id_jenis_harga').inTable('guru.jenis_harga').onUpdate('cascade').onDelete('cascade')
        table.foreign('pekerjaan_id').references('id_pekerjaan').inTable('support.pekerjaan').onUpdate('cascade').onDelete('cascade')
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('guru.guru')
    .dropTable('guru.jenis_harga')
    .dropTable('guru.mata_pelajaran')
    .dropTable('guru.kelas')
    .dropTable('guru.kategori_kelas')
};
