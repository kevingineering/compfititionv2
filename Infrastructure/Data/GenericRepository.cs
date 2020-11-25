using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
  public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
  {
    private readonly DataContext _context;

    public GenericRepository(DataContext context)
    {
      _context = context;
    }

    //READ
    public async Task<T> GetByIdAsync(Guid id)
    {
      return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
    {
      return await ApplySpecification(spec).FirstOrDefaultAsync();
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
      return await _context.Set<T>().ToListAsync();
    }

    public async Task<IReadOnlyList<T>> ListAsync(Core.Specifications.ISpecification<T> spec)
    {
      return await ApplySpecification(spec).ToListAsync();
    }

    private IQueryable<T> ApplySpecification(ISpecification<T> spec)
    {
      return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
    }

    //CREATE
    public void Add(T entity)
    {
      _context.Set<T>().Add(entity);
    }

    //UPDATE
    public void Update(T entity)
    {
      //.Update has chance to add, this will only update
      _context.Set<T>().Attach(entity);
      _context.Entry(entity).State = EntityState.Modified;
    }

    //DELETE
    public void Delete(T entity)
    {
      _context.Set<T>().Remove(entity);
    }
  }
}